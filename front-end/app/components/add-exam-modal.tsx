"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from "../lib/api"

interface AddExamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddExamModal({ open, onOpenChange }: AddExamModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
    status: "DRAFT" as "DRAFT" | "PUBLISHED" | "CLOSED",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      return
    }

    if (!formData.duration.trim()) {
      return
    }
    const payload = {
      ...formData,
      duration: Number(formData.duration),
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const res = await api.post("/exam", payload)
      if(res.data.success){
        alert("Tạo kỳ thi thành công!")
      }

      console.log("Exam data:", payload)

      // Reset form
      setFormData({
        title: "",
        duration: "",
        description: "",
        status: "DRAFT",
      })

      onOpenChange(false)
    } catch (error) {
      console.error("Error creating exam:", error)
      alert("Có lỗi xảy ra khi tạo kỳ thi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm kỳ thi mới</DialogTitle>
          <DialogDescription>Tạo một kỳ thi mới với các thông tin cần thiết</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề kỳ thi *</Label>
            <Input
              id="title"
              placeholder="Nhập tiêu đề kỳ thi..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Thời lượng *</Label>
            <Input
              id="duration"
              placeholder="Ví dụ: 90 phút, 2 giờ..."
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Nhập mô tả về kỳ thi..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              disabled={isLoading}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Bản nháp</SelectItem>
                <SelectItem value="PUBLISHED">Đã xuất bản</SelectItem>
                <SelectItem value="CLOSED">Đã đóng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang tạo..." : "Tạo kỳ thi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
