
import IconHeart from '@repo/design-system/components/icons/IconHeart';
interface PostType {
  category: string;
  title: string;
  description: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  status: '모집중' | '모집마감';
}

export default function CommunityPage() {
  const categories = ['친목도모', '인생샷찍', '카공모임', '건강맛집', '빵지순', '모집중만 보기', '전체 보기'];
  
  const posts: PostType[] = [
    {
      category: '친목도모',
      title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
      description: '디저트 추천도 해주고, 새로운 맛집도 공유하면 좋을 것 같아요...',
      location: '카펫 망원점',
      currentMembers: 1,
      maxMembers: 3,
      status: '모집중'
    },
    {
      category: '친목도모',
      title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
      description: '디저트 추천도 해주고, 새로운 맛집도 공유하면 좋을 것 같아요...',
      location: '카펫 망원점',
      currentMembers: 1,
      maxMembers: 3,
      status: '모집중'
    },
    {
      category: '친목도모',
      title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
      description: '디저트 추천도 해주고, 새로운 맛집도 공유하면 좋을 것 같아요...',
      location: '카펫 망원점',
      currentMembers: 1,
      maxMembers: 3,
      status: '모집중'
    },
    {
      category: '친목도모',
      title: '망원동 카페에서 디저트 먹으며 수다 떨어요!',
      description: '디저트 추천도 해주고, 새로운 맛집도 공유하면 좋을 것 같아요...',
      location: '카펫 망원점',
      currentMembers: 1,
      maxMembers: 3,
      status: '모집중'
    },
    // 더미 데이터 추가 가능
  ];

  return (
    <main className="max-w-screen-md mx-auto px-4 py-6">
      {/* 검색바 */}
      <div className="relative mb-8">
        <h2 className="">@@님에게 딱 맞는 디저트 메이트를 찾아보세요!</h2>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 overflow-x-auto mb-6 pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-full bg-white text-sm whitespace-nowrap hover:bg-gray-50"
          >
            {category}
          </button>
        ))}
      </div>

      {/* 게시글 목록 */}
      <section className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={index} // FIXME: 아이디 나오면 교체
            className="bg-white rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                {post.category}
              </span>
              <button>
                <IconHeart />
              </button>
            </div>
            <h3 className="text-lg font-bold mb-1">{post.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{post.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>장소: {post.location}</span>
              <div className="flex gap-2">
                <span>인원: {post.currentMembers}명 / 총 {post.maxMembers}명</span>
                <button
                  className={`px-4 py-1 rounded-full text-white ${
                    post.status === '모집중' ? 'bg-yellow-400' : 'bg-gray-400'
                  }`}
                >
                  {post.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}