'use client'

import dynamic from 'next/dynamic'
import { ComponentType, useMemo } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Editor(field: any) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  )
  return <ReactQuill theme="snow" {...field} />
}
