"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddExamModal } from "../../components/add-exam-modal"
import { DataTable } from "../../components/ListExam"

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    // <div className="min-h-screen bg-background p-8">
      <div className="">
        <div className="flex items-center justify-between my-8 mx-5">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý kỳ thi</h1>
            <p className="text-muted-foreground mt-2">Tạo và quản lý các kỳ thi của bạn</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Thêm kỳ thi mới</Button>
        </div>

          <div className="py-12 text-muted-foreground">
            <DataTable/>
        </div>

        <AddExamModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      </div>
    // </div>
  )
}
