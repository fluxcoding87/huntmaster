import React, { useEffect, useState } from "react";

interface TextLimiterProps {
  text: string;
  wordLimit: number;
}

export const TextLimiter: React.FC<TextLimiterProps> = ({
  text,
  wordLimit,
}) => {
  const [limitedText, setLimitedText] = useState<string>(text);

  useEffect(() => {
    const words = text.split(" ");

    // Check if the word count exceeds the limit
    if (words.length > wordLimit) {
      const limited = words.slice(0, wordLimit).join(" ") + "...";
      setLimitedText(limited);
    } else {
      setLimitedText(text);
    }
  }, [text, wordLimit]);

  return (
    <div className="text-[14.5px] font-medium text-pretty text-muted-foreground">
      {limitedText}
    </div>
  );
};
