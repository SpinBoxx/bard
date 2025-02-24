import * as React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  textClassName?: string;
  underlineClassName?: string;
  underlinePath?: string;
  underlineHoverPath?: string;
  underlineDuration?: number;
}

const AnimatedText = React.forwardRef<HTMLDivElement, AnimatedTextProps>(
  (
    {
      text,
      textClassName,
      underlineClassName,
      underlinePath = "M5.57861 18.6249C10.0287 18.4534 14.493 17.0859 18.7559 16.274C31.5001 13.8467 45.2814 13.1302 58.288 11.572C85.4227 8.32145 113.756 5.81834 141.305 5.34638C181.991 4.64939 222.422 5.30285 263.101 5.30285C325.914 5.30285 387.89 11.4242 450.533 13.0958C506.886 14.5996 564.33 17.8562 620.772 15.0985C669.893 12.6984 718.707 6.87015 767.982 6.87015",
      ...props
    },
    ref
  ) => {
    const pathVariants: Variants = {
      hidden: {
        pathLength: 0,
        opacity: 0,
      },
      visible: {
        pathLength: 1,
        opacity: 1,
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-start justify-start gap-2",
          props.className
        )}
      >
        <div className="relative">
          <motion.h1
            className={cn("text-4xl font-bold text-left", textClassName)}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {text}
          </motion.h1>

          <motion.svg
            width="40%"
            height="20"
            viewBox="0 0 300 20"
            className={cn(
              "absolute overflow-visible -bottom-4 left-0",
              underlineClassName
            )}
            initial={{
              y: 5,
            }}
          >
            <motion.path
              d={underlinePath}
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: 0.6,
              }}
            />
          </motion.svg>
        </div>
      </div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

export { AnimatedText };
