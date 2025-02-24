import { http, HttpResponse } from "msw";

export const mateHandlers = [
  http.get('http://localhost:3000/api/mates/6f1fcad5-bac1-4851-a6fe-34262ebf9b04', async ({ request }) => {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
      return new HttpResponse('Mate ID is required', { status: 400 });
    }

    const data = {
      mateUuid: "6f1fcad5-bac1-4851-a6fe-34262ebf9b04",
      recruit: true,
      nickname: "John",
      userUuid: "550e8400-e29b-41d4-a716-446655440000",
      title: "Weekend Hiking Group",
      content: "Join us for a refreshing mountain hike this weekend!",
      recruitYn: true,
      mateImage: [
        "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/10/a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78-"
      ],
      profileImage: [
        "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
      ],
      mateCategory: "친목도모",
      place: {
        placeName: "키토빵앗간",
        address: null,
        latitude: null,
        longitude: null
      }
    }

    return new HttpResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('http://localhost:3000/api/mates', async ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get('from');
    const responseData = {
      mates: [
        {
          mateId: "3482635e-ebd8-43e4-90a5-8e6a2a313fa4",
          userId: "550e8400-e29b-41d4-a716-446655440000",
          title: "Weekend Hiking Group",
          content: "Join us for a refreshing mountain hike this weekend!",
          recruit: true,
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/10/a1b2c3d4-e5f6-7890-ab12-cd34ef56gh78-"
          ],
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          nickname: "John",
          mateCategory: "친목도모"
        },
        {
          mateId: "b672d15f-0ed5-4ad3-9d2b-5b1c25a4389a",
          userId: "660e8411-e31a-42f4-a726-556755450001",
          title: "Java Study Group",
          content: "Let's study Java together and prepare for coding interviews!",
          recruit: true,
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/11/b2c3d4e5-f6g7-8901-bc23-de45fg67hi89-"
          ],
          mateCategory: "인생사진"
        },
        {
          mateId: "c783e26g-1fe6-5be4-ad3c-6c2d36b549ab",
          userId: "770e8422-f42b-53f5-b837-667855460002",
          title: "Weekend Football Match",
          content: "Looking for players to join our casual football match on Sunday!",
          recruit: false,
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/12/c3d4e5f6-g7h8-9012-cd34-ef56gh78ij90-"
          ],
          mateCategory: "빵지순례"
        },
        {
          mateId: "d894f37h-2gf7-6cf5-be4d-7d3e47c65abc",
          userId: "880e8433-g53c-64g6-c948-778955470003",
          title: "Book Club - Monthly Meetup",
          content: "Discussing this month's book over coffee. Everyone's welcome!",
          recruit: true,
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/13/d4e5f6g7-h8i9-0123-de45-fg67hi89jk01-"
          ],
          mateCategory: "건강맛집"
        },
        {
          mateId: "e9a5g48i-3hg8-7dg6-cf5e-8e4f58d76bcd",
          userId: "990e8444-h64d-75h7-da59-889a66480004",
          title: "Korean BBQ Night",
          content: "Who’s up for some delicious Korean BBQ this Friday night?",
          recruit: false,
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/14/e5f6g7h8-i9j0-1234-ef56-gh78ij90kl12-"
          ],
          mateCategory: "친목도모"
        },
        {
          mateId: "f0b6h59j-4ih9-8eh7-dg6f-9f5g69e87cde",
          userId: "aa0e8455-i75e-86i8-eb60-99ab77590005",
          title: "Photography Walk",
          content: "Explore the city and capture amazing photos together!",
          recruit: true,
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/15/f6g7h8i9-j0k1-2345-fg67-hi89jk01lm23-"
          ],
          mateCategory: "카공모임"
        },
        {
          mateId: "g1c7i60k-5ji0-9fi8-eh7g-af6h70f98def",
          userId: "bb0e8466-j86f-97j9-fc71-aabc886a0006",
          title: "Startup Networking Event",
          content: "Meet fellow entrepreneurs and exchange ideas!",
          recruit: true,
          profileImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/2/d15b7f54-9288-49f3-a8b6-368bf075e284-IMG_0743.jpeg"
          ],
          mateImage: [
            "https://desserbee-bucket.s3.ap-northeast-2.amazonaws.com/mate/16/g7h8i9j0-k1l2-3456-gh78-ij90kl12mn34-"
          ],
          mateCategory: '인생사진',
        },
      ],
      isLast: false,
    };

    return new HttpResponse(JSON.stringify(responseData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
];
