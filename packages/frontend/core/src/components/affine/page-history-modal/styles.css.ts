import { cssVar } from '@toeverything/theme';
import { cssVarV2 } from '@toeverything/theme/v2';
import { createVar, globalStyle, style } from '@vanilla-extract/css';
import { range } from 'lodash-es';

const headerHeight = createVar('header-height');
const footerHeight = createVar('footer-height');
const historyListWidth = createVar('history-list-width');
const previewTopOffset = createVar('preview-top-offset');
export const root = style({
  height: '100%',
  width: '100%',
  fontFamily: 'Inter',
  vars: {
    [headerHeight]: '52px',
    [footerHeight]: '68px',
    [historyListWidth]: '240px',
    [previewTopOffset]: '40px',
  },
});
export const modalContent = style({
  display: 'flex',
  height: `calc(100% - ${footerHeight})`,
  width: '100%',
  position: 'absolute',
  selectors: {
    '&[data-empty="true"]': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
});
export const previewWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100%',
  position: 'relative',
  zIndex: 0,
  overflow: 'hidden',
  width: `calc(100% - ${historyListWidth})`,
  backgroundColor: cssVar('backgroundSecondaryColor'),
});

export const previewContainer = style({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  position: 'absolute',
  top: 0,
  left: 40,
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: cssVar('shadow3'),
  height: '200%',
  width: `calc(100% - 80px)`,
  backgroundColor: cssVar('backgroundPrimaryColor'),
  transformOrigin: 'top center',
  transition: 'transform 0.3s 0.1s ease-in-out, opacity 0.3s ease-in-out',
  selectors: {
    ...Object.fromEntries(
      range(-20, 20).map(i => [
        `&[data-distance="${i}"]`,
        {
          transform: `scale(${1 - 0.05 * i}) translateY(calc(${-8 * i}px + ${previewTopOffset}))`,
          opacity: [0, 1, 2].includes(i) ? 1 : 0,
          zIndex: -i,
          pointerEvents: i === 0 ? 'auto' : 'none',
        },
      ])
    ),
    '&[data-distance="20"],&[data-distance="> 20"]': {
      transform: `scale(0) translateY(calc(${-8 * 20}px + ${previewTopOffset}))`,
      opacity: 0,
      zIndex: -20,
      pointerEvents: 'none',
    },
    '&[data-distance="< -20"]': {
      transform: `scale(2) translateY(calc(${-8 * -20}px + ${previewTopOffset}))`,
      opacity: 0,
      zIndex: 20,
      pointerEvents: 'none',
    },
  },
});

export const previewContent = style({
  height: `calc(50% - ${previewTopOffset} - ${headerHeight})`,
});

export const previewHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: headerHeight,
  borderBottom: `1px solid ${cssVar('borderColor')}`,
  backgroundColor: cssVar('backgroundPrimaryColor'),
  padding: '0 12px',
  flexShrink: 0,
  gap: 12,
});
export const previewHeaderTitle = style({
  fontSize: cssVar('fontXs'),
  fontWeight: 600,
  maxWidth: 400,
  // better responsiveness
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
export const previewHeaderTimestamp = style({
  color: cssVar('textSecondaryColor'),
  backgroundColor: cssVar('backgroundSecondaryColor'),
  padding: '0 10px',
  borderRadius: 4,
  fontSize: cssVar('fontXs'),
});
export const editor = style({
  height: '100%',
  flexGrow: 1,
});
export const rowWrapper = style({
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
});
export const loadingContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  backgroundColor: cssVar('backgroundPrimaryColor'),
});
export const historyList = style({
  overflow: 'hidden',
  height: '100%',
  width: historyListWidth,
  flexShrink: 0,
  borderLeft: `1px solid ${cssVar('borderColor')}`,
});
export const historyListScrollable = style({
  height: `calc(100% - ${headerHeight})`,
});
export const historyListScrollableInner = style({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 16,
  height: '-webkit-fill-available',
});
export const historyListHeader = style({
  display: 'flex',
  alignItems: 'center',
  height: headerHeight,
  borderBottom: `1px solid ${cssVar('borderColor')}`,
  fontWeight: 'bold',
  flexShrink: 0,
  padding: '0 12px',
});
export const historyItemGroup = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '0 8px',
  gap: 8,
  marginTop: 4,
  marginBottom: 4,
});
export const historyItemGroupContent = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  paddingLeft: 24,
  '::before': {
    position: 'absolute',
    top: 0,
    left: 15.5,
    content: '""',
    display: 'block',
    height: '100%',
    width: '1px',
    borderLeft: `1px solid ${cssVar('borderColor')}`,
  },
});
export const historyItemGroupTitle = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0 12px 0 4px',
  borderRadius: 4,
  whiteSpace: 'nowrap',
  fontSize: cssVar('fontXs'),
  color: cssVarV2('text/secondary'),
  fontWeight: 500,
  textTransform: 'capitalize',
  gap: 4,
  backgroundColor: cssVarV2('layer/background/primary'),
  height: 24,
  ':hover': {
    background: cssVarV2('layer/background/hoverOverlay'),
  },
});
export const historyItem = style([
  rowWrapper,
  {
    borderRadius: 4,
    display: 'flex',
    gap: 4,
    flexDirection: 'column',
    padding: '4px 8px',
    cursor: 'pointer',
    ':hover': {
      background: cssVarV2('layer/background/hoverOverlay'),
    },
  },
]);

export const historyItemTimestamp = style({
  color: cssVarV2('text/primary'),
  borderRadius: 4,
  fontSize: cssVar('fontXs'),
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
});

export const historyItemCurrent = style({
  color: cssVarV2('text/emphasis'),
  textTransform: 'capitalize',
});

export const historyItemNameWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  color: cssVarV2('text/secondary'),
  fontSize: cssVar('fontXs'),
});

export const historyItemAvatar = style({
  backgroundColor: cssVarV2('layer/background/secondary'),
});

export const historyItemName = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const historyItemLoadMore = style([
  historyItem,
  {
    cursor: 'pointer',
    color: cssVarV2('text/secondary'),
    flexShrink: 0,
    textAlign: 'left',
    alignItems: 'flex-start',
  },
]);
globalStyle(`${historyItem} button`, {
  color: 'inherit',
});
export const historyFooter = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 68,
  borderTop: `1px solid ${cssVar('borderColor')}`,
  padding: '0 24px',
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
});
export const spacer = style({
  flexGrow: 1,
});
export const emptyHistoryPrompt = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  zIndex: 1,
  gap: 20,
});
export const emptyHistoryPromptTitle = style({
  fontWeight: 600,
  fontSize: cssVar('fontH5'),
});
export const emptyHistoryPromptDescription = style({
  width: 320,
  textAlign: 'center',
  fontSize: cssVar('fontXs'),
  color: cssVar('textSecondaryColor'),
});
export const collapsedIcon = style({
  transition: 'transform 0.2s ease-in-out',
  selectors: {
    '&[data-collapsed="false"]': {
      transform: 'rotate(90deg)',
    },
  },
});
export const collapsedIconContainer = style({
  fontSize: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  transition: 'transform 0.2s',
  color: 'inherit',
});
export const planPromptWrapper = style({
  padding: '4px 8px',
});
export const planPrompt = style({
  gap: 6,
  borderRadius: 8,
  flexDirection: 'column',
  padding: 10,
  fontSize: cssVar('fontXs'),
  backgroundColor: cssVar('backgroundSecondaryColor'),
});
export const planPromptTitle = style({
  fontWeight: 600,
  marginBottom: 14,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: cssVar('textSecondaryColor'),
});
export const planPromptUpdateButton = style({
  textDecoration: 'underline',
  cursor: 'pointer',
  marginLeft: 4,
});
