pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '5', daysToKeepStr: '3'))
    }

    stages {
        stage('Clean up') {
            steps {
                deleteDir()
                sh 'docker system prune -af'
            }
        }

        stage('Validate PR') {
            when {
                allOf {
                    changeRequest()
                    expression { env.CHANGE_TARGET == 'develop' }
                }
            }
            stages {
                stage('Build Frontend') {
                    agent {
                        docker {
                            image 'node:20'
                        }
                    }
                    steps {
                        dir('client') {
                            withCredentials([
                                string(credentialsId: 'vite-url-ilhan', variable: 'VITE_API_BASE_URL')
                            ]) {
                                writeFile file: '.env.production', text: "VITE_API_BASE_URL=\"${VITE_API_BASE_URL}\"\n"
                            }
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }
                stage('Build Backend') {
                    agent {
                        docker {
                            image 'maven:3-eclipse-temurin-21'
                        }
                    }
                    steps {
                        dir('server') {
                            sh 'mvn clean install -DskipTests'
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                allOf {
                    branch 'develop'
                    not { changeRequest() }
                }
            }
            stages {
                stage('Build Frontend') {
                    agent {
                        docker {
                            image 'node:20'
                        }
                    }
                    steps {
                        echo 'Building frontend (deploy)...'
                        dir('client') {
                            withCredentials([
                                string(credentialsId: 'vite-url-ilhan', variable: 'VITE_API_BASE_URL')
                            ]) {
                                writeFile file: '.env.production', text: "VITE_API_BASE_URL=\"${VITE_API_BASE_URL}\"\n"
                            }
                            sh 'npm install'
                            sh 'npm run build'
                        }
                    }
                }

                stage('Build Backend') {
                    agent {
                        docker {
                            image 'maven:3-eclipse-temurin-21'
                        }
                    }
                    steps {
                        echo 'Building backend...'
                        dir('server') {
                            sh 'mvn clean install -DskipTests'
                        }
                    }
                }

                stage('Build & Push Images') {
                    agent any
                    environment {
                        SHORT_SHA = "${env.GIT_COMMIT.take(7)}"
                    }
                    steps {
                        echo 'Building and pushing images...'
                        withCredentials([
                            usernamePassword(
                                credentialsId: 'docker-registry',
                                usernameVariable: 'DOCKER_USER',
                                passwordVariable: 'DOCKER_PASS'
                            )
                        ]) {
                            sh '''
                                echo "$DOCKER_PASS" | \
                                docker login registry.praksa.abhapp.com \
                                    --username "$DOCKER_USER" --password-stdin

                                docker build -t registry.praksa.abhapp.com/ilhan-be:$SHORT_SHA server
                                docker push registry.praksa.abhapp.com/ilhan-be:$SHORT_SHA

                                docker build -t registry.praksa.abhapp.com/ilhan-fe:$SHORT_SHA client
                                docker push registry.praksa.abhapp.com/ilhan-fe:$SHORT_SHA
                            '''
                        }
                    }
                }

                stage('Deploy App') {
                    agent any
                    environment {
                        PATH = "/usr/local/bin:${env.PATH}"
                    }
                    steps {
                        checkout scm

                        script {
                            def shortCommit = env.GIT_COMMIT.take(7)

                            withCredentials([
                                usernamePassword(
                                    credentialsId: 'docker-registry',
                                    usernameVariable: 'DOCKER_USER',
                                    passwordVariable: 'DOCKER_PASS'
                                ),
                                string(credentialsId: 'postgres-password-ilhan', variable: 'POSTGRES_PASSWORD'),
                                string(credentialsId: 'postgres-db-ilhan', variable: 'POSTGRES_DB'),
                                string(credentialsId: 'postgres-user-ilhan', variable: 'POSTGRES_USER'),
                                string(credentialsId: 'postgres-user-ilhan', variable: 'DB_USER'),
                                string(credentialsId: 'postgres-password-ilhan', variable: 'DB_PASSWORD'),
                                string(credentialsId: 'postgres-url-ilhan', variable: 'DB_URL'),
                                string(credentialsId: 'omdb-api-key-ilhan', variable: 'OMDB_API_KEY'),

                            ]) {
                                writeFile file: '.env', text: """\
                                    TAG=${shortCommit}
                                    POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
                                    POSTGRES_USER=${POSTGRES_USER}
                                    POSTGRES_DB=${POSTGRES_DB}
                                    DB_USER=${DB_USER}
                                    DB_PASSWORD=${DB_PASSWORD}
                                    DB_URL=${DB_URL}
                                    OMDB_API_KEY=${OMDB_API_KEY}
                                """.stripIndent()

                                sh """
                                    echo "$DOCKER_PASS" | docker login registry.praksa.abhapp.com \
                                        --username "$DOCKER_USER" --password-stdin

                                    docker compose -f docker-compose-ilhan.yml pull
                                    docker compose -f docker-compose-ilhan.yml up -d
                                """
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning workspace...'
            deleteDir()
        }

        success {
            script {
                if (!env.CHANGE_ID && env.BRANCH_NAME == 'develop') {
                    def shortCommit = env.GIT_COMMIT.take(7)
                    withCredentials([
                        string(credentialsId: 'slack-bot-token', variable: 'SLACK_TOKEN')
                    ]) {
                        sh """
                            curl -X POST https://slack.com/api/chat.postMessage \
                                -H "Authorization: Bearer $SLACK_TOKEN" \
                                -H "Content-type: application/json" \
                                --data '{
                                    "channel": "#jenkins-test",
                                    "text": "*Build Succeeded* for `${env.BRANCH_NAME}` (`${shortCommit}`)"
                                }'
                        """
                    }
                }
            }
        }

        failure {
            script {
                if (!env.CHANGE_ID && env.BRANCH_NAME == 'develop') {
                    def shortCommit = env.GIT_COMMIT.take(7)
                    withCredentials([
                        string(credentialsId: 'slack-bot-token', variable: 'SLACK_TOKEN')
                    ]) {
                        sh """
                            curl -X POST https://slack.com/api/chat.postMessage \
                                -H "Authorization: Bearer $SLACK_TOKEN" \
                                -H "Content-type: application/json" \
                                --data '{
                                    "channel": "#jenkins-test",
                                    "text": ":x: *Build Failed* for `${env.BRANCH_NAME}` (`${shortCommit}`)"
                                }'
                        """
                    }
                }
            }
        }
    }
}
