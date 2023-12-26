import { Col, Typography } from "antd";

type Detail = string | number;

interface DetailsPairProps {
  title?: Detail;
  value?: Detail;
}

export const DetailsPair: React.FC<DetailsPairProps | null> = (props) => {
  if (props === null) {
    return;
  }
  return (
    <Typography.Paragraph style={{ minHeight: "25px" }} className="field">
      <Col span={16}>
        {props.title && (
          <Typography.Text style={{ fontSize: "15px" }} strong>
            {props.title}
          </Typography.Text>
        )}
      </Col>
      <Col span={14}>
        {props.value && (
          <Typography.Text style={{ fontSize: "14px" }}>
            {props.value}
          </Typography.Text>
        )}
      </Col>
    </Typography.Paragraph>
  );
};
