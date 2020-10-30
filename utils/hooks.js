import React, { useState, useEffect } from 'react'
import qs from 'qs'
import useSWR from 'swr'

/**
*/
export const useQueryList = (searchPath, initFilter) => {

  const pageSize = 20

  const [loading, setLoading] = useState(false)

  const [filter, setFilter] = useState(initFilter)
  const [currentPage, setCurrentPage] = useState(1)

  const { data : totalPages, error: error0 } = useSWR([searchPath, 'count', filter], () => {
    const url = `${process.env.APIV1}${searchPath}/count?token=${process.env.API_TOKEN}&${qs.stringify({
      ...filter,
    })}` 

    return fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then( res => res.json() )

  })
  const pagination = {
    current : currentPage,
    total: totalPages,
    pageSize,
    showTotal : (total) => (<p>共{total}条</p>),
    onChange : (p) => { setCurrentPage(p) } 
  }

  const { data, error } = useSWR( [searchPath, currentPage, filter], () => {
    setLoading(true)

    const url = `${process.env.APIV1}${searchPath}?token=${process.env.API_TOKEN}&_sort=updated_at:DESC&${qs.stringify({
      ...filter,
      _start: currentPage,
      _limit: pageSize
    })}` 
    return fetch(url, {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' }
    }).then( res => res.json() )
      .then( data => {
        setLoading(false)
        return data.map( value => ({ key: value.id, ...value }) )
      })
      .catch( err => {
        setLoading(false)
      } )
  })

  return {
    loading,
    data,
    pagination,
    setCurrentPage,
    filter,
    setFilter
  }
}
