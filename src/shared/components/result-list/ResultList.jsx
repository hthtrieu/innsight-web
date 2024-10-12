import React, { useEffect } from 'react'
import SearchResultItem from './SearchResultItem'

const ResultList = ({ result }) => {
  useEffect(() => {

  }, [result])
  return (
    <div>
      {result && <>
        <p className='font-bold text-xl whitespace-nowrap'>{result?.location}: {result?.totalItems} <span>chỗ nghỉ</span></p>
        <div className='w-full h-fit'>
          {result?.hotels?.map((item, index) => (
            <SearchResultItem key={index} item={item} />
          ))}
        </div>
      </>}

    </div>
  )
}

ResultList.defaultProps = {
  result: {
    totalItems: 0,
    location: '',
    data: []
  }
}

export default ResultList