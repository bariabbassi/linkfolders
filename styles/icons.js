import { createIcon } from '@chakra-ui/icons';

export const LinkfoldersIcon = createIcon({
  displayName: 'LinkfoldersIcon',
  viewBox: '0 0 128 128',
  path: (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M81 43H57c-2 0-4-1-4-3l-1-6c-1-2 0-3 2-3h24c2 0 4 1 4 3l1 6c1 2-1 3-2 3z"
        fill="#946134"
      />
      <path
        d="M59 43H35c-2 0-3-1-4-3l-1-6c0-2 1-3 3-3h24c1 0 3 1 3 3l2 6c0 2-1 3-3 3z"
        fill="#FF8F00"
      />
      <linearGradient
        id="a"
        x1="57.4"
        x2="57.4"
        y1="31.1"
        y2="123.2"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFC107" offset="0" />
        <stop stop-color="#F1AF06" offset=".2" />
        <stop stop-color="#CD7F02" offset=".6" />
        <stop stop-color="#BD6A00" offset=".7" />
      </linearGradient>
      <path
        d="M7 31c-1 0-3 1-3 3v87l3 2h96l2-2 5-63V46c0-3-2-6-5-6H41l-3-2-2-6-3-1H7z"
        fill="url(#a)"
      />
      <linearGradient
        id="b"
        x1="64.3"
        x2="64.3"
        y1="57.7"
        y2="123.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FFEE58" offset="0" />
        <stop stop-color="#FFEA54" offset=".3" />
        <stop stop-color="#FDDC48" offset=".6" />
        <stop stop-color="#FCC733" offset=".9" />
        <stop stop-color="#FBC02D" offset="1" />
      </linearGradient>
      <path
        d="M102 124H8c-3 0-4-2-4-4l18-58c0-2 3-4 5-4h94c2 0 4 2 3 4l-17 58c0 2-3 4-5 4z"
        fill="url(#b)"
      />
      <path
        d="M78 34l1 1 1 6 3 2h22c1 0 2 1 2 3v12a3 3 0 003 3h11l-17 58-2 2H7V34h71m0-3H7c-1 0-3 1-3 3v87c0 1 2 3 4 3h94c2 0 5-2 5-4l17-58c1-2-1-4-3-4h-11V46c0-3-2-6-5-6H83l-1-6c0-2-2-3-4-3z"
        fill="#424242"
        opacity=".2"
      />
    </svg>
  )
});
