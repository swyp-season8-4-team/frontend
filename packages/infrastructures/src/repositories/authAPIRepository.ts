import { isServer } from '@repo/api';
import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import {
  OAuthSocialProvider,
  type AuthRepository,
  type JWTRefreshTokens,
  type JWTTokens,
  type OAuthSignInData,
  type RawSignInResponse,
  type ResetPasswordData,
  type ResetPasswordResponse,
  type SignInData,
  type SignInResponse,
  type SignOutData,
  type SignUpData,
  type VerifyEmailData,
  type VerifyEmailRequestData,
  type VerifyEmailRequestResponse,
  type VerifyEmailResponse,
} from '@repo/entity/src/auth';
import APIRepository from './apiRepository';
import AuthConverter from '../mappers/authConverter';

export default class AuthAPIRepository
  extends APIRepository
  implements AuthRepository
{
  private readonly authConverter = new AuthConverter();

  async socialSignInWithKakao({
    data,
  }: BaseRequestData<OAuthSignInData>): Promise<SignInResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const response = await fetch<OAuthSignInData, RawSignInResponse>({
      data,
      method: 'POST',
      url: `${this.endpoint}/auth/oauth2/callback`,
    });

    return this.authConverter.convertRawSignInResponse(response);
  }

  async socialSignInWithApple({
    data,
  }: BaseRequestData<OAuthSignInData>): Promise<SignInResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { code, id_token, state, user, provider } = data;

    const response = await fetch<OAuthSignInData, RawSignInResponse>({
      data: {
        code,
        id_token,
        state,
        user: user || null,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/oauth2/apple/callback`,
    });

    return this.authConverter.convertRawSignInResponse(response);
  }

  async resetPassword({
    data,
  }: BaseRequestData<ResetPasswordData>): Promise<ResetPasswordResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const response = await fetch<ResetPasswordData, ResetPasswordResponse>({
      data,
      method: 'POST',
      url: `${this.endpoint}/auth/password/reset`,
    });

    return response;
  }

  async findPassword(
    data: BaseRequestData<{ email: string }>,
  ): Promise<unknown> {
    const response = await fetch<void, void>({
      method: 'POST',
      url: `${this.endpoint}/auth/password/reset/request`,
    });

    return response;
  }

  async validateResetPasswordToken(
    data: BaseRequestData<{ email: string; token: string }>,
  ): Promise<unknown> {
    const response = await fetch<void, JWTTokens>({
      method: 'POST',
      url: `${this.endpoint}/auth/password/reset/validate`,
    });

    return response;
  }

  async signIn({ data }: BaseRequestData<SignInData>): Promise<SignInResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, password, keepLoggedIn } = data;

    const response = await fetch<SignInData, RawSignInResponse>({
      data: {
        email,
        password,
        keepLoggedIn,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/login`,
    });

    return this.authConverter.convertRawSignInResponse(response);
  }

  async signUp({
    data,
    authorization,
  }: BaseRequestData<SignUpData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not exist');
    }

    if (!authorization) {
      throw new Error('authorization is not exist');
    }

    const {
      email,
      password,
      confirmPassword,
      nickname,
      gender,
      name,
      phoneNumber,
      role,
    } = data;

    const response = await fetch<SignUpData, unknown>({
      headers: {
        'X-Email-Verification-Token': authorization as string,
      },
      data: {
        email,
        password,
        confirmPassword,
        nickname,
        gender,
        name,
        phoneNumber,
        role,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/signup`,
    });

    return response;
  }

  async signUpWithProfileImage({
    data,
    authorization,
  }: BaseRequestData<SignUpData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not exist');
    }

    if (!authorization) {
      throw new Error('authorization is not exist');
    }

    const {
      email,
      password,
      confirmPassword,
      nickname,
      gender,
      name,
      phoneNumber,
      role,
      profileImage,
    } = data;

    // FormData 객체 생성
    const formData = new FormData();

    // 텍스트 데이터 추가
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    if (nickname) formData.append('nickname', nickname);
    if (gender) formData.append('gender', gender);
    if (name) formData.append('name', name);
    if (phoneNumber) formData.append('phoneNumber', phoneNumber);
    if (role) formData.append('role', role);

    // 프로필 이미지 추가
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    const response = await fetch<FormData, unknown>({
      headers: {
        'X-Email-Verification-Token': authorization as string,
        // Content-Type은 자동으로 설정됨 (multipart/form-data)
      },
      formData,
      method: 'POST',
      url: `${this.endpoint}/auth/signup-with-profile`,
    });

    return response;
  }

  async signOut({ data }: BaseRequestData<SignOutData>): Promise<void> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const response = await fetch<void, void>({
      headers: {
        authorization: `${data.authorization}`,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/logout`,
    });

    return response;
  }

  async verifyEmail({
    data,
  }: BaseRequestData<VerifyEmailData>): Promise<VerifyEmailResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, code, purpose } = data;

    const response = await fetch<VerifyEmailData, VerifyEmailResponse>({
      data: {
        email,
        code,
        purpose,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/email/verify`,
    });

    return response;
  }

  async verifyEmailRequest({
    data,
  }: BaseRequestData<VerifyEmailRequestData>): Promise<VerifyEmailRequestResponse> {
    if (!data) {
      throw new Error('data is not exist');
    }

    const { email, purpose } = data;

    const response = await fetch<
      VerifyEmailRequestData,
      VerifyEmailRequestResponse
    >({
      data: {
        email,
        purpose,
      },
      method: 'POST',
      url: `${this.endpoint}/auth/email/verification-request`,
    });

    return response;
  }

  async refreshAccessToken(
    refreshToken: string,
    deviceId?: string,
  ): Promise<JWTRefreshTokens> {
    if (!isServer) {
      // 서버 사이드에서만 refreshToken 접근 가능
      throw new Error('This method is only available on the server side.');
    }

    const headers: Record<string, string> = {
      authorization: `Bearer ${refreshToken}`,
    };

    // deviceId가 제공된 경우 쿠키 헤더에 추가
    if (deviceId) {
      headers['Cookie'] = `deviceId=${deviceId}`;
    }

    const response = await fetch<void, JWTRefreshTokens>({
      headers,
      method: 'POST',
      url: `${this.endpoint}/auth/token/refresh`,
    });

    return response;
  }

  async getAuthorization(accessToken?: string): Promise<string> {
    if (!accessToken) {
      throw new Error('accessToken is not exist');
    }

    if (!isServer) {
      // 서버 사이드에서만 인증 접근 가능
      throw new Error('This method is only available on the server side.');
    }

    const response = await fetch<void, string>({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
      url: ``, // TODO:
    });

    return response;
  }
}
