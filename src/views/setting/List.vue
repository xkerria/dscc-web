<template>
  <div class="settings">
    <a-tabs v-model:activeKey="tab">
      <a-tab-pane key="base" tab="基本设置">
        <div class="item">
          <div class="label">{{ logo.name }}</div>
          <div class="value">
            <image-field
              v-model:value="logo.value"
              @update:value="(val) => onValueChange(logo)"
              width="100"
              height="100"
            />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ platform.name }}</div>
          <div class="value">
            <a-typography-text v-model:content="platform.value" :editable="{ onEnd: () => onValueChange(platform) }" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ bg.name }}</div>
          <div class="value">
            <image-field v-model:value="bg.value" @update:value="(val) => onValueChange(bg)" width="320" height="180" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ max.name }}</div>
          <div class="value">
            <a-typography-text v-model:content="max.value" :editable="{ onEnd: () => onValueChange(max) }" />
            <a-typography-text>{{ numeral(max.value).format('0.00 b') }}</a-typography-text>
          </div>
        </div>
        <div class="item">
          <div class="label">{{ pageSize.name }}</div>
          <div class="value">
            <a-typography-text v-model:content="pageSize.value" :editable="{ onEnd: () => onValueChange(pageSize) }" />
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="service" tab="服务设置" force-render>
        <div class="item">
          <div class="label">{{ jump.name }}</div>
          <div class="value">
            <a-typography-text v-model:content="jump.value" :editable="{ onEnd: () => onValueChange(jump) }" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ person.name }}</div>
          <div class="value">
            <a-typography-text v-model:content="person.value" :editable="{ onEnd: () => onValueChange(person) }" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ phone.name }}</div>
          <div class="value">
            <a-typography-text v-model:content="phone.value" :editable="{ onEnd: () => onValueChange(phone) }" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ qr.name }}</div>
          <div class="value">
            <image-field v-model:value="qr.value" @update:value="(val) => onValueChange(qr)" width="160" height="160" />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ coupon.name }}</div>
          <div class="value">
            <image-field
              v-model:value="coupon.value"
              @update:value="(val) => onValueChange(coupon)"
              width="335"
              height="90"
            />
          </div>
        </div>
        <div class="item">
          <div class="label">{{ staffTypes.name }}</div>
          <div class="value">
            <a-typography-text
              v-model:content="staffTypes.value"
              :editable="{ onEnd: () => onValueChange(staffTypes) }"
            />
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import settingApi from '@/api/setting'
import { message } from 'ant-design-vue'
import ImageField from '@/components/image/Field.vue'
import numeral from 'numeral'

const store = useStore()
const tab = ref('base')

const logo = computed(() => store.getters['glob/setting']('LOGO', true))
const platform = computed(() => store.getters['glob/setting']('平台名称', true))
const bg = computed(() => store.getters['glob/setting']('登录背景', true))
const max = computed(() => store.getters['glob/setting']('上传最大限制', true))
const pageSize = computed(() => store.getters['glob/setting']('表格默认行数', true))
const coupon = computed(() => store.getters['glob/setting']('优惠券背景', true))
const person = computed(() => store.getters['glob/setting']('客服人员', true))
const phone = computed(() => store.getters['glob/setting']('客服电话', true))
const qr = computed(() => store.getters['glob/setting']('客服二维码', true))
const staffTypes = computed(() => store.getters['glob/setting']('职员类型', true))
const jump = computed(() => store.getters['glob/setting']('关联小程序ID', true))

const onValueChange = (item) => {
  settingApi.update(item.name, item).then(() => {
    message.success('修改成功')
    store.dispatch('glob/loadSettings')
  })
}
</script>

<style lang="less" scoped>
.settings {
  padding: 16px;
  background-color: #fff;

  .item {
    display: flex;
    width: 100%;
    align-items: flex-start;
    border-bottom: 1px solid hsv(0, 0, 94%);
    padding: 16px 0;

    .label {
      width: 150px;
    }

    .value {
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
