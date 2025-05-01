export enum RouteGroup {
  MateDetail = '[lang]/(user)/mate/[mateId]',
  ReviewDetail = '[lang]/(user)/review/[reviewId]',
}

export enum NavigationLanguageGroup {
  ko = '/ko',
}

export enum NavigationPathGroup {
  OAuthCallback = '/oauth/callback/',
  AppleOAuthCallback = '/oauth/apple/callback',
  SignIn = '/sign-in/',
  Map = '/map/',
  Store = '/store/',
  Preference = '/preference/',
  MateDetail = '/mate/',
  ReviewDetail = '/review/',
}

export enum NavigationPathname {
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  SignOut = '/sign-out',
  Map = '/map',
  ForgotPassword = '/sign-in/forgot-password',
  Community = '/community',
  CommunityDessertMate = '/community/dessert/mate',
  CommunityDessertMateWrite = '/mate/write',
  CommunityDessertReview = '/community/dessert/review',
  CommunityReviewWrite = '/review/write',
  OAuthAppleCallbackLoading = '/oauth/apple/callback/loading',

  MateWrite = '/mate/write',

  My = '/my',
  MySetting = '/my/setting',
  MyBookmarkList = '/my/bookmark-list',
  MyPoints = '/my/points',
  MyCoupon = '/my/coupon',

  MySavedReview = '/my/bookmark-list/community-review',
  MySavedDesssertMate = '/my/bookmark-list/dessert-mate',

  PrivacyPolicy = '/privacy-policy',
  TermsOfService = '/terms-of-service',
  LocationBasedFeaturesTermsOfService = '/terms-of-service/location-based-features',
  MarketingTermsOfService = '/terms-of-service/marketing',

  Owner = '/owner',

  OwnerRegister = '/owner/register',
  OwnerRegisterBasicInfo = '/owner/register/basic-info',
  OwnerRegisterOperatingHours = '/owner/register/operating-hours',
  OwnerRegisterMenu = '/owner/register/menu',
  OwnerRegisterCheck = '/owner/register/check',
  OwnerRegisterComplete = '/owner/register/complete',
  OwnerRegisterLoading = '/owner/register/loading',

  OwnerStoreList = '/owner/storelist',

  OwnerDashboard = '/owner/dashboard',
  OwnerDashboardBasicInfo = '/owner/dashboard/basic-info',
  OwnerDashboardNotices = '/owner/dashboard/notices',
  OwnerRegisterNotice = '/owner/dashboard/notices/register',
}
