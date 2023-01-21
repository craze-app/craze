import { useEffect, useState } from 'react'
import Cmdk, { filterItems, getItemIndex } from 'react-cmdk'
import { useHistory } from 'react-router-dom'

import { features } from '../../../features'

const CommandPalette = () => {
  const [page, setPage] = useState<'root' | 'projects'>('root')
  const [open, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const history = useHistory()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const filteredItems = filterItems(
    [
      {
        heading: 'Features',
        id: 'features',
        items: features.map((feature) => ({
          id: `feature-${feature.id}`,
          children: feature.title,
          closeOnSelect: true,
          onClick: () => {
            history.push(`/features/${feature.id}`)
          },
        })),
      },
    ],
    search,
    {
      filterOnListHeading: false,
    },
  )

  return (
    <Cmdk
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page={page}>
      <Cmdk.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <Cmdk.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <Cmdk.ListItem key={id} index={getItemIndex(filteredItems, id)} {...rest} />
              ))}
            </Cmdk.List>
          ))
        ) : (
          <Cmdk.FreeSearchAction />
        )}
      </Cmdk.Page>

      <Cmdk.Page id="projects">
        <div>hello world</div>
      </Cmdk.Page>
    </Cmdk>
  )
}

export default CommandPalette
