const responseGenerate = (status: number, message: string | null, data: Object | Object[] | null) => {
    return { status, message, data }
}

export default responseGenerate;