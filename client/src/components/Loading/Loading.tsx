import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import type { SpinProps } from "antd";

import "./loading.scss";

export type LoadingProps = {
  size?: SpinProps["size"];
};

export const Loading = ({ size }: LoadingProps) => {
  return (
    <div className="loading-container">
      <Spin indicator={<LoadingOutlined spin />} size={size} />
    </div>
  );
};
