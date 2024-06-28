import React from 'react';
import { Button } from "@nextui-org/react";
import { HeartIcon } from "./HeartIcon.js";

type LikeButtonProps = {
  liked: boolean;
  handleLikeToggle: () => void;
};

const LikeButton: React.FC<LikeButtonProps> = ({ liked, handleLikeToggle }) => (
  <Button
    isIconOnly
    className="mr-4 text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
    radius="full"
    variant="light"
    onPress={(e) => {
      handleLikeToggle();
    }}
  >
    <HeartIcon
      className={`${liked ? "[&>path]:stroke-transparent" : ""}`}
      fill={liked ? "#65FFBE" : "none"}
      width={undefined}
      height={undefined}
    />
  </Button>
);

export default LikeButton;
