import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, constants } from '@alexseifert/frontend-library';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setMobileSidebarOpen } from 'store/entities/ui';
import { usePathnameWithoutBookId } from 'lib/urlHelper';

import { ReactComponent as Logo } from 'assets/images/toolbar-icon.svg';

import styles from './styles.module.scss';
import toolbarStyles from '../../styles.module.scss';

const logoSize = 30;

const LeftSide: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const backPathname = usePathnameWithoutBookId();
  const { windowWidth, mobileSidebarOpen } = useAppSelector(state => state.ui);

  return (
    <>
      {windowWidth >= constants.window.WINDOW_WIDTHS.mdMax ? (
        <Link
          to='/'
          className={styles.logo}
        >
          <Logo width={logoSize} height={logoSize} />
          <span>Charlotte</span>
        </Link>
      ) : (
        <div className={styles.mobileWrapper}>
          {bookId && windowWidth <= constants.window.WINDOW_WIDTHS.smMax ? (
            <Button
              className={toolbarStyles.toolbarButton}
              iconButton
              onClick={() => navigate(backPathname)}
            >
              <span className='material-icons'>arrow_back</span>
            </Button>
          ) : (
            <Button
              className={toolbarStyles.toolbarButton}
              iconButton
              onClick={() => dispatch(setMobileSidebarOpen(!mobileSidebarOpen))}
            >
              <span className='material-icons'>menu</span>
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default LeftSide;
