export function formatFileSize(sizeInBytes) {
    let size = sizeInBytes;

    if (size < 1024) {
        return size + 'b';
    }

    size /= 1024;

    if (size < 1024) {
        return size.toFixed(1) + 'Kb';
    }

    size /= 1024;

    if (size < 1024) {
        return size.toFixed(1) + 'Mb';
    }

    size /= 1024;

    if (size < 1024) {
        return size.toFixed(1) + 'Gb';
    }

    size /= 1024;

    return size.toFixed(1) + 'Tb';
}