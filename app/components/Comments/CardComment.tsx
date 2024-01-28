"use client";
import { getUserWithId } from "@/app/lib/auth/auth";
import { increaseLike, decreaseLike } from "@/app/lib/actions/comment";
import { Avatar, Badge, Button, Link } from "@nextui-org/react";
import { useState, useEffect, useRef } from "react";
import { LottieRefCurrentProps } from "lottie-react";
// import lottie animations
import Lottie from "lottie-react";
import like from "@/app/assets/like.json";
import dislike from "@/app/assets/dislike.json";

interface CardCommentProps {
  userId: string;
  content: string;
  last_edited: string;
  likes: number;
  commentId: string;
}

export default function CardComment({
  userId,
  commentId,
  content,
  last_edited,
  likes,
}: CardCommentProps) {
  const [user, setUser] = useState<any>({});
  const [timePassed, setTimePassed] = useState<string>("");
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  }, [liked]);

  const handleLike = async () => {
    if (liked) {
      await decreaseLike(commentId);
      setLikeCount(likeCount - 1);
      setLiked(false);
    }
    // if it is not liked, then we want to increase the like count
    else {
      await increaseLike(commentId);
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  useEffect(() => {
    const test = async () => {
      const data = await getUserWithId(userId);
      const userData = data.data?.[0];
      setUser(userData);
      const lastEditedTime = new Date(last_edited);
      const now = new Date();

      const timeDifference = Math.floor(
        (now.getTime() - lastEditedTime.getTime()) / 1000
      ); // in s

      let timePassedString = "";

      if (timeDifference < 60) {
        timePassedString = `${timeDifference} second${
          timeDifference === 1 ? "" : "s"
        } ago`;
      } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        timePassedString = `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
      } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        timePassedString = `${hours} hour${hours === 1 ? "" : "s"} ago`;
      } else {
        const days = Math.floor(timeDifference / 86400);
        timePassedString = `${days} day${days === 1 ? "" : "s"} ago`;
      }

      setTimePassed(timePassedString);
    };
    test();
  }, [userId, last_edited]);

  return (
    <div className="flex  gap-2 bg-slate-400 p-2 bg-opacity-20 rounded-lg justify-between">
      <div className="flex gap-2">
        <Avatar size="lg"></Avatar>
        <div className="flex flex-col">
          <p className="font-bold text-sm mb-1">
            {user.user_name}{" "}
            <span className="font-light ml-1">{timePassed}</span>
          </p>
          <p className="-mt-1">{content}</p>
        </div>
      </div>
      <div className="flex justify-center items-center pr-2">
        <Link onClick={handleLike} className="text-white light:text-black">
          <Lottie
            className="-mr-2"
            animationData={liked ? like : dislike}
            loop={false}
            autoplay={false}
            style={{ height: 50, width: 50, cursor: "pointer" }}
            lottieRef={lottieRef}
          />
          {likeCount}
        </Link>
      </div>
    </div>
  );
}
