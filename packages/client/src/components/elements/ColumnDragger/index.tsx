import React, { useCallback, MutableRefObject } from 'react';
import { debounce } from 'lodash';

import { useAppDispatch } from 'store/hooks';

import styles from './styles.module.scss';

interface Props {
  columnRef: MutableRefObject<HTMLDivElement | null>;
  setWidth: (width: number) => void;
  setStoreWidth: (width: number) => any;
  minWidth: number;
}

const ColumnDragger: React.FC<Props> = ({ columnRef, setWidth, setStoreWidth, minWidth }) => {
  const dispatch = useAppDispatch();

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = columnRef.current?.getBoundingClientRect();
    const startCursorX = e.pageX;

    const handleMouseMove = debounce((e: any): void => {
      if (rect) {
        const newWidth = Math.max(rect.width + (e.pageX - startCursorX), minWidth);
        setWidth(newWidth);
      }
    }, 1);

    const handleMouseUp = (): void => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      const rect = columnRef.current?.getBoundingClientRect();
      dispatch(setStoreWidth(rect?.width ?? minWidth));
    };

    e.preventDefault();
    e.stopPropagation();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div
      className={styles.columnDragger}
      onMouseDown={handleMouseDown}
    />
  );
};

export default ColumnDragger;
