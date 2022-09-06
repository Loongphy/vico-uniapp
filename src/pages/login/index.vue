<script setup lang="ts">
import type { LoginReqParams } from '@/api/auth/types'
import { useAuthStore } from '@/store/modules/auth'

const authStore = useAuthStore()
const loginForm = ref<LoginReqParams>({
  username: 'admin',
  password: '123456',
})
const submit = () => {
  authStore.login(loginForm.value)
}
</script>

<template>
  <view class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <form class="mt-8 space-y-6">
      <view class="rounded-md shadow-sm -space-y-px">
        <view>
          <input :value="loginForm.username" type="text" placeholder="请输入用户名" class="appearance-none rounded-none relative block  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        </view>
        <view>
          <input :value="loginForm.password" type="password" placeholder="请输入密码" class="appearance-none rounded-none relative block px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
        </view>
      </view>

      <view class="mt-2">
        <button class="button relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md" @click="submit">
          登录
        </button>
      </view>
    </form>
  </view>
</template>

