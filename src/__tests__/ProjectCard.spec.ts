import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectCard from '@/components/ProjectCard.vue'
import type { Project } from '@/lib/projects'

const project: Project = {
  slug: 'demo',
  title: 'Demo',
  status: 'En desarrollo',
  summary: 'Resuelve algo.',
  facts: [],
  stack: ['Vue', 'Terraform'],
  links: { repo: 'https://github.com/example/demo' },
}

const links = (wrapper: ReturnType<typeof mount>) =>
  wrapper.findAll('.links a').map((a) => a.attributes('href'))

describe('ProjectCard', () => {
  it('renders the number, the title, every stack item and the repo link', () => {
    const wrapper = mount(ProjectCard, { props: { project, number: '02' } })

    expect(wrapper.find('h3').text()).toBe('Demo')
    expect(wrapper.find('.path').text()).toBe('02 · ~/work/demo')
    expect(wrapper.findAll('.tags li').map((li) => li.text())).toEqual(['Vue', 'Terraform'])
    expect(links(wrapper)).toEqual(['https://github.com/example/demo'])
  })

  it('labels an external demo with its host and a site page with its name', () => {
    const external = mount(ProjectCard, {
      props: { project: { ...project, links: { demo: 'https://frimee.es' } }, number: '01' },
    })
    expect(external.find('.links a').text()).toBe('frimee.es')

    const internal = mount(ProjectCard, {
      props: { project: { ...project, links: { demo: '/como-esta-hecha/' } }, number: '02' },
    })
    expect(internal.find('.links a').text()).toBe('Cómo está hecha')
  })

  it('shows "My part" and the facts only when the project has them', () => {
    const solo = mount(ProjectCard, { props: { project, number: '02' } })
    expect(solo.find('dl').exists()).toBe(false)

    const team = mount(ProjectCard, {
      props: {
        project: { ...project, part: 'El backend.', facts: [{ label: 'Diseño', value: 'Vicky' }] },
        number: '01',
      },
    })
    expect(team.find('dl').text()).toContain('El backend.')
    expect(team.find('dl').text()).toContain('Vicky')
  })

  it('uses the #media slot instead of the image', () => {
    const wrapper = mount(ProjectCard, {
      props: { project, number: '02' },
      slots: { media: '<figure class="custom">figure</figure>' },
    })
    expect(wrapper.find('.media .custom').exists()).toBe(true)
  })
})
