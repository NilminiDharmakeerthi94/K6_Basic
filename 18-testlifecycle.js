var counter=1

export function setup(){
    console.log(`Inside setup - ${counter}`)

}
export default function(){
    console.log(`inside set up - ${counter} vu=${__vu} ITER=${__ITER}`)
    counter = counter +1 
}
export function teardown(){
    console.log(`Inside Set up - ${conuter}`)
}