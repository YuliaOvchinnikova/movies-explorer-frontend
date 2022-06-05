import {
  ROWS_LARGE,
  COLUMNS_LARGE,
  ROWS_MEDIUM,
  COLUMNS_MEDIUM,
  ROWS_SMALL,
  COLUMNS_SMALL,
  LARGE_WIDTH,
  MEDIUM_WIDTH,
} from './constants';

export function calculateInitialCardsNumber(width) {
  if (width >= LARGE_WIDTH) {
    return [ROWS_LARGE, COLUMNS_LARGE];
  }
  if (width >= MEDIUM_WIDTH) {
    return [ROWS_MEDIUM, COLUMNS_MEDIUM];
  }
  return [ROWS_SMALL, COLUMNS_SMALL];
}
