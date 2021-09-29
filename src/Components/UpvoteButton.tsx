import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HackIdea } from "../interfaces/documentData";

export const UpvoteButton: React.FC<UpvoteButtonProps> = (
  props: UpvoteButtonProps
) => {
  const { handleUpvote, liked, index, upvotes } = props;
  return (
    <span className="upvote-container">
      {liked ? (
        <BsHeartFill onClick={() => handleUpvote(index)} className={`upvote-icon bg-red`} />
      ) : (
        <BsHeart
          onClick={() => handleUpvote(index)}
          className={`upvote-icon`}
        />
      )}

      {upvotes}
    </span>
  );
};

interface UpvoteButtonProps {
  liked: boolean;
  handleUpvote: (idx: number) => void;
  index: number;
  upvotes: number;
}
