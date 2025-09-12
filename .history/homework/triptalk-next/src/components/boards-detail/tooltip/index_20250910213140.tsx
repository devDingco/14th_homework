'use client';
import React, { useMemo, useState } from 'react';
import { Button, ConfigProvider, Flex, Segmented, Tooltip } from 'antd';
import type { TooltipProps } from 'antd';

interface TooltipLocationProps {
  address?: string;
  children: React.ReactNode;
}

const buttonWidth = 80;

export default function TooltipLocation({
  address,
  children,
}: TooltipLocationProps) {
  const text = (
    <span style={{ color: 'black', backgroundColor: 'white' }}>
      {address || '주소 정보 없음'}
    </span>
  );
  const [arrow, setArrow] = useState<'Show' | 'Hide' | 'Center'>('Show');

  const mergedArrow = useMemo<TooltipProps['arrow']>(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <ConfigProvider button={{ style: { width: buttonWidth, margin: 4 } }}>
      <Segmented
        value={arrow}
        options={[]}
        onChange={setArrow}
        style={{ marginBottom: 24 }}
      />
      <Flex vertical justify="center" align="center" className="demo">
        <Flex justify="center" align="center" style={{ whiteSpace: 'nowrap' }}>
          <Tooltip placement="bottomRight" title={text} arrow={mergedArrow}>
            {children}
          </Tooltip>
        </Flex>
      </Flex>
    </ConfigProvider>
  );
}
