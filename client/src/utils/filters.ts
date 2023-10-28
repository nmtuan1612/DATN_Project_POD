import { omit } from 'lodash'
import { createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/hooks/useQueryConfig'

export const handleSelectProductFilter = (queries: QueryConfig, filterType: keyof QueryConfig, value: string) => {
  if (queries[filterType]) {
    let idsList = queries[filterType]?.split(',') || []
    if (idsList?.includes(value)) {
      idsList = idsList.filter((id: string) => id !== value)
      // check if idsList empty or not
      queries = idsList.length ? { ...queries, [filterType]: idsList.join(',') } : omit(queries, [filterType])
    } else {
      queries[filterType] = [...idsList, value].join(',')
    }
  } else {
    queries[filterType] = value
  }

  const searchString = createSearchParams({
    ...queries
    // typeId
  }).toString()

  return searchString
}
