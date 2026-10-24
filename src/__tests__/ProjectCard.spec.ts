import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/lib/projects'

const project: Project = {
  slug: 'demo',
  title: 'Demo',
  status: 'En desarrollo',
  problem: 'Resuelve algo.',
  stack: ['Vue', 'Terraform'],
  role: 'Proyecto individual.',
  links: { repo: 'https://github.com/example/demo' },
}

describe('ProjectCard', () => {
  it('renders the title, every stack item and the repo link', () => {
    const wrapper = mount(ProjectCard, { props: { project } })

    expect(wrapper.find('h3').text()).toBe('Demo')
    expect(wrapper.findAll('.tags li').map((li) => li.text())).toEqual(['Vue', 'Terraform'])
    expect(wrapper.find('a').attributes('href')).toBe('https://github.com/example/demo')
  })

  it('omits the demo button when there is no demo', () => {
    const wrapper = mount(ProjectCard, { props: { project } })

    expect(wrapper.text()).not.toContain('Ver demo')
  })
})
