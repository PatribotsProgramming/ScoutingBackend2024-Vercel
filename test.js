dict = {
    "a": 1,
    "b": 2,
    "c": 3,
    "d": 4,
    "e": 5
}

console.log(
    // Object.keys(dict).reduce((interactables, item) => {
    //     console.log(item + " " + dict[item], dict[item] > 2, interactables)
    //     if (dict[item] > 2) {
    //         return interactables.concat({
    //             [item]: dict[item]
    //         })
    //     }
        
    // }, {})
    Object.fromEntries(Object.entries(dict).filter(([key, value]) => value > 2))
)
