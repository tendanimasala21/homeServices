// app/api/upload/route.ts
import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' }, 
        { status: 400 }
      )
    }

    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const uploadedFiles = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      // Generate unique filename
      const extension = path.extname(file.name)
      const filename = `${uuidv4()}${extension}`
      const filePath = path.join(uploadDir, filename)

      await writeFile(filePath, buffer)
      uploadedFiles.push(`/uploads/${filename}`)
    }

    return NextResponse.json({ urls: uploadedFiles })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload files' },
      { status: 500 }
    )
  }
}