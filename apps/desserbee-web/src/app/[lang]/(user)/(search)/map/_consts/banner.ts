import bee from '@/app/[lang]/(user)/(search)/map/_assets/svg/logo-bee.svg';
import map from '@/app/[lang]/(user)/(search)/map/_assets/svg/banner-map.png';
import store from '@/app/[lang]/(user)/(search)/map/_assets/svg/banner-store.png';
import ticket from '@/app/[lang]/(user)/(search)/map/_assets/svg/banner-ticket.png';

export const BANNERS = [
  {
    content: '우리 같이 디저트 맛집 갈 사람을\n찾아볼까요?',
    bgColor: 'bg-[#FFE7A3]',
    btnContent: '디저트 메이트 찾기',
    imgSrc: bee,
    path: '/community',
  },
  {
    content: '로그인 시 나의 취향에 딱 맞는\n디저트샵을 추천해줘요!',
    bgColor: 'bg-[#FFDB75]',
    btnContent: '로그인 하기',
    imgSrc: store,
    path: '/sign-in',
  },
  {
    content: '우리 동네 디저트 쿠폰\n받으러 갈까요?',
    bgColor: 'bg-[#FFCF48]',
    btnContent: '쿠폰 / 이벤트 보기',
    imgSrc: ticket,
    path: '',
  },
  {
    content: '우리 동네 찐 리뷰를\n확인해 보세요!',
    bgColor: 'bg-[#FFC635]',
    btnContent: '디저트 리뷰 보기',
    imgSrc: map,
    path: '/community/reviews',
  },
];
