import * as React from "react";
import { Trans } from "react-i18next";
import styled from "styled-components";
import Flex from "~/components/Flex";
import Avatar from "../Avatar";
import { IssueStatusIcon } from "../Icons/IssueStatusIcon";
import Text from "../Text";
import Time from "../Time";
import {
  Preview,
  Title,
  Description,
  Card,
  CardContent,
  Label,
  LabelContainer,
  Info,
} from "./Components";

type Props = {
  /** Issue url */
  url: string;
  /** Issue title */
  title: string;
  /** Issue description */
  description: string;
  /** Wehn the issue was created */
  createdAt: string;
  /** Author of the issue */
  author: { name: string; avatarUrl: string };
  /** Labels attached to the issue */
  labels: Array<{ name: string; color: string }>;
  /** Issue status */
  status: { name: string; color: string };
  /** Issue identifier */
  identifier: string;
};

const HoverPreviewIssue = React.forwardRef(function _HoverPreviewIssue(
  {
    url,
    title,
    identifier,
    description,
    author,
    labels,
    status,
    createdAt,
  }: Props,
  ref: React.Ref<HTMLDivElement>
) {
  const authorName = author.name;

  return (
    <Preview as="a" href={url} target="_blank" rel="noopener noreferrer">
      <Flex column ref={ref}>
        <Card fadeOut={false}>
          <CardContent>
            <Flex gap={2} column>
              <Title>
                <StyledIssueStatusIcon
                  status={status.name}
                  color={status.color}
                />{" "}
                {title}&nbsp;<Text type="tertiary">{identifier}</Text>
              </Title>
              <Flex align="center" gap={8}>
                <Avatar src={author.avatarUrl} />
                <Info>
                  <Trans>
                    {{ authorName }} created{" "}
                    <Time dateTime={createdAt} addSuffix />
                  </Trans>
                </Info>
              </Flex>
              <Description>{description}</Description>

              <LabelContainer wrap>
                {labels.map((label, index) => (
                  <Label key={index} color={label.color}>
                    {label.name}
                  </Label>
                ))}
              </LabelContainer>
            </Flex>
          </CardContent>
        </Card>
      </Flex>
    </Preview>
  );
});

const StyledIssueStatusIcon = styled(IssueStatusIcon)`
  vertical-align: middle;
`;

export default HoverPreviewIssue;
