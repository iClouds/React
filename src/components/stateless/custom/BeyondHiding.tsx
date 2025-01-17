import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd/lib/tooltip';
import React from 'react';

type BeyondHidingProps = Omit<TooltipProps, 'open' | 'trigger'> & {
  className?: string;
  style?: React.CSSProperties;
  title: React.ReactNode;
};

const BeyondHiding: FC<BeyondHidingProps> = memo(({ className, style, title, ...props }) => {
  const [isShow, setIsShow] = useState(false);

  const contentRef = useRef<HTMLSpanElement>(null);

  const isShowTooltip = (): void => {
    // 计算span标签的offsetWidth与盒子元素的offsetWidth，给isShow赋值
    if (contentRef.current && contentRef.current.parentElement) {
      const spanWidth = contentRef.current.offsetWidth;
      const parentWidth = contentRef.current.parentElement.offsetWidth;

      if (spanWidth > parentWidth) {
        setIsShow(true);
      }
      // 这里你可以使用spanWidth和parentWidth
    }
  };
  return (
    <Tooltip
      open={isShow}
      title={title}
      {...props}
    >
      <span
        className={className}
        ref={contentRef}
        style={style}
        onMouseLeave={() => setIsShow(false)}
        onMouseOver={isShowTooltip}
      >
        {title}
      </span>
    </Tooltip>
  );
});

export default BeyondHiding;
