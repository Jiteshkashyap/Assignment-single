export const pagination = ({page=1,limit=10}={})=>{

    page =parseInt(page)
    limit=parseInt(limit)

    if(page<1) page=1
    if(limit<1)limit=10

    const skip=(page-1)*limit
    return{skip,limit,page}
}