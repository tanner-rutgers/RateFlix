function childrenAdded(addedNodes) {
    for (const node of addedNodes) {
        if (node.classList.contains("previewModal--wrapper")) {
            var image_node = node.querySelector('img[alt]:not([alt=""])');
            var title = image_node.getAttribute('alt');
            getRatings(title, null, null, null, function(ratings) {
                var metadata_node = node.querySelector('div.previewModal--metadatAndControls-container');
                injectRatings(metadata_node, ratings);
            });
        }
    }
}

var observer = new MutationObserver(function(mutations, observer) {
    for (const mutation of mutations) {
        switch(mutation.type) {
            case 'childList':
                childrenAdded(mutation.addedNodes);
                break;
        }
    }
});

observer.observe(document.getElementById("appMountPoint"), {
    childList: true,
    subtree: true
});
