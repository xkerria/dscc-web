<script lang="jsx">
import { defineComponent } from 'vue'
import UiIcon from '@/components/ui/Icon.vue'
import Brand from './Brand.vue'
import { useRouter, useRoute } from 'vue-router'
import { routes as allRoutes } from '@/router'

export default defineComponent(() => {
  const route = useRoute()
  const router = useRouter()
  const routes = allRoutes.find((i) => i.path === '/')?.children ?? []

  const onClick = (item) => {
    router.push({ name: item.name })
  }

  const generate = (item) => {
    if (item?.meta?.hidden) return
    if (!item.name && !item.children) return

    if (item.name) {
      const slots = {
        default: () => <span>{item.meta.title}</span>,
        icon: () => <UiIcon name={item.meta.icon} />
      }
      return <AMenuItem v-slots={slots} key={item.name} onClick={() => onClick(item)} />
    }

    const children = item.children.filter((i) => !i.meta.hidden)
    if (children.length === 1) {
      const slots = {
        default: () => <span>{children[0].meta.title}</span>,
        icon: () => <UiIcon name={children[0].meta.icon} />
      }
      return <AMenuItem v-slots={slots} key={children[0].name} onClick={() => onClick(children[0])} />
    }

    if (children.length > 1) {
      const slots = {
        title: () => <span>{item.meta.title}</span>,
        icon: () => <UiIcon name={item.meta.icon} />
      }
      return (
        <ASubMenu v-slots={slots} key={item.name}>
          {item.children.map((i) => generate(i))}
        </ASubMenu>
      )
    }
  }

  const comp = routes.map((i) => generate(i))

  const getParent = (r) => {
    if (r.children) return [r.name]
    let parent = []
    routes
      .filter((i) => i?.children?.length)
      .forEach((i) => {
        const idx = i.children.findIndex((i) => i.name === r.name)
        if (idx !== -1) parent.push(i.name)
      })
    return parent
  }

  return () => (
    <div className='wrapper'>
      <Brand />
      <AMenu mode='inline' style='flex: 1; overflow-y: auto' selectedKeys={[route?.name]} openKeys={getParent(route)}>
        {comp}
      </AMenu>
    </div>
  )
})
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
