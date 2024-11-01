export function updateGenNum(value) {
    value ? document.getElementById('genNum').textContent = value : document.getElementById('genNum').textContent = '1';
}