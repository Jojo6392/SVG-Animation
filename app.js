const distancePerPoint = 0.5
const color = 'rgb(43, 43, 43)'

let fps = 30
let items = []

// Récupérer tous les "<path>" des SVG
document.querySelectorAll("svg").forEach(item => {
    let paths = []
    for (let path of item.children) {
        paths.push(path)
    }
    items.push(paths)
})

// Appeler les fonctions selon le rendu que l'on veut
svgAnimation(items[0])

fps = 60
svgAnimation(items[1])
svgAnimation(items[2].reverse())

fps = 90
svgAnimation(items[3])
svgAnimation(items[4].reverse())

/**
 * Fonction pour animer un svg
 * Prend en paramètre un tableau d'élements 'path' d'un svg
 * @param {Array} paths 
 */
function svgAnimation(paths) {
    let pathIndex = 0
    let length = 1
    let interval = setInterval(animation, 1000 / fps)

    function animation() {
        // Check s'il y a des paths de svg donc des svg
        if(paths[pathIndex]) {

            let pathLength  = paths[pathIndex].getTotalLength()
            length += distancePerPoint
            paths[pathIndex].style.stroke = color
            // 1er paramètre de stroke dasharray est le dash, le second est le gap
            paths[pathIndex].style.strokeDasharray = `${length + 1} ${pathLength}`

            // Si on a fini de parcourir la longueur du path actuel
            if(length >= pathLength) {
                clearInterval(interval)
                setTimeout(() => {
                    length = 1
                    interval = setInterval(animation, 1000 / fps)
                    pathIndex++
                }, 300);
            }
        }
        else clearInterval(interval)
    }
}