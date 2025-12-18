import { defineStore } from 'pinia'
import type { Record, RecordListResponse } from '@/types/api'

export const useRecordStore = defineStore('record', {
    state: () => ({
    records: [] as Record[],
    loading: false,
    error: null as string | null
    }),
    actions: {
    async fetchRecords() {
        this.loading = true
        this.error = null
        try {
            const res = await $fetch<RecordListResponse>(
                '/api/record/list',
                {
                    credentials: 'include'
                })
            this.records = res.data
            return true
        } catch (error: any) {
            if (error?.statusCode === 401) {
                this.records = []
                this.error = 'Unauthorized'
            } else {
                this.error = error?.data?.message || 'Failed to load records'
                }
                return false
            } finally {
                this.loading = false
            }
        }
    }
})




