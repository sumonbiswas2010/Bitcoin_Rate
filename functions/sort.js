const sorted_array = (sorted, sortedDate) =>{
    let temp, tempDate;
    let results = [];
    for(i=sorted.length-1;i>=1;i--)
    {
        for(let j=0;j<i;j++){
            if(sorted[i]>sorted[i+1]){
                temp = sorted[i];
                sorted[i] = sorted[i+1];
                sorted[i+1] = temp;

                tempDate = sortedDate[i];
                sortedDate[i] = sortedDate[i+1]
                sortedDate[i+1] = tempDate;
            }
        }
                  
    }
    results.push(sorted[0])
    results.push(sorted[29])
    results.push(sortedDate[0])
    results.push(sortedDate[29])
    return results
}
module.exports = sorted_array

