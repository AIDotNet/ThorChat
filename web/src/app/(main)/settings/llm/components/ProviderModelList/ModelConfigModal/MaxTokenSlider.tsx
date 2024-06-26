import { InputNumber, Slider } from 'antd';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';
import useMergeState from 'use-merge-value';

import { useServerConfigStore } from '@/store/serverConfig';
import { serverConfigSelectors } from '@/store/serverConfig/selectors';

const Kibi = 1024;

const exponent = (num: number) => Math.log2(num);
const getRealValue = (num: number) => Math.round(Math.pow(2, num));
const powerKibi = (num: number) => Math.round(Math.pow(2, num) * Kibi);

interface MaxTokenSliderProps {
  defaultValue?: number;
  onChange?: (value: number) => void;
  value?: number;
}

const MaxTokenSlider = memo<MaxTokenSliderProps>(({ value, onChange, defaultValue }) => {
  const { t } = useTranslation('setting');

  const [token, setTokens] = useMergeState(0, {
    defaultValue,
    onChange,
    value: value,
  });

  const [powValue, setPowValue] = useMergeState(0, {
    defaultValue: exponent(typeof defaultValue === 'undefined' ? 0 : defaultValue / 1024),
    value: exponent(typeof value === 'undefined' ? 0 : value / Kibi),
  });

  const updateWithPowValue = (value: number) => {
    setPowValue(value);

    setTokens(getRealValue(value) === 1 ? 0 : powerKibi(value));
  };

  const updateWithRealValue = (value: number) => {
    setTokens(Math.round(value));

    setPowValue(exponent(value / Kibi));
  };

  const isMobile = useServerConfigStore(serverConfigSelectors.isMobile);

  const marks = useMemo(() => {
    return {
      [exponent(1)]: '0',
      [exponent(2)]: isMobile ? '2' : '2K', // 2 Kibi = 2048
      [exponent(4)]: isMobile ? '4' : '4K',
      [exponent(8)]: isMobile ? '8' : '8K',
      [exponent(16)]: isMobile ? '16' : '16K',
      [exponent(32)]: isMobile ? '32' : '32K',
      [exponent(64)]: isMobile ? '64' : '64K',
      [exponent((128 / Kibi) * 1000)]: ' ', // hide tick mark
      [exponent((200 / Kibi) * 1000)]: isMobile ? '200' : '200k', // 200,000
      [exponent(Kibi)]: isMobile ? '1024' : '1M',
    };
  }, [isMobile]);

  return (
    <Flexbox align={'center'} gap={12} horizontal>
      <Flexbox flex={1}>
        <Slider
          marks={marks}
          max={exponent(Kibi)}
          min={0}
          onChange={updateWithPowValue}
          step={null}
          tooltip={{
            formatter: (x) => {
              if (typeof x === 'undefined') return;
              if (x === 0) return t('llm.customModelCards.modelConfig.tokens.unlimited');

              let value = getRealValue(x);
              if (value < 125) return value.toFixed(0) + 'K';
              else if (value < Kibi) return ((value * Kibi) / 1000).toFixed(0) + 'k';
              return (value / Kibi).toFixed(0) + 'M';
            },
          }}
          value={powValue}
        />
      </Flexbox>
      <div>
        <InputNumber
          min={0}
          onChange={(e) => {
            if (!e && e !== 0) return;

            updateWithRealValue(e);
          }}
          step={2 * Kibi}
          value={token}
        />
      </div>
    </Flexbox>
  );
});
export default MaxTokenSlider;
