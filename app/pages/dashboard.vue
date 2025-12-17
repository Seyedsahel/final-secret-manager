<script setup lang="ts">
    import { reactive } from 'vue';
    interface Record {
        id: number;
        name: string;
        content: string;
      }

    const secret = reactive<Record>({
        id: 1,
        name: 'My Secret',
        content: 'This is a secret message.'
    })
</script>
<template>
    <RecordItem :record="secret"></RecordItem>
    <RecordItem :record="secret"></RecordItem>
    <RecordItem :record="secret"></RecordItem>
</template>

