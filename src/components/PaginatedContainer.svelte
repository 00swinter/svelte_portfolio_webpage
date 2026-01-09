<script>
    let { children } = $props();
    
    let currentPage = $state(0);
    let totalPages = $state(0);
    let containerElement = $state();

    // Logic to calculate how many pages we have based on children
    $effect(() => {
        if (containerElement) {
            // We assume each "page" is the full width of the container
            const count = containerElement.children[0].children.length;
            totalPages = count;
        }
    });

    function nextPage() {
        if (currentPage < totalPages - 1) currentPage++;
    }

    function prevPage() {
        if (currentPage > 0) currentPage--;
    }

    function goToPage(index) {
        currentPage = index;
    }
</script>

<div class="paginator-frame">
    
    <button class="nav-btn left" onclick={prevPage} disabled={currentPage === 0}>
        &larr;
    </button>

    <div class="inner-content-viewport" bind:this={containerElement}>
        <div 
            class="inner-content-track" 
            style:transform="translateX(-{currentPage * 100}%)"
        >
            {@render children()}
        </div>
    </div>

    <button class="nav-btn right" onclick={nextPage} disabled={currentPage === totalPages - 1}>
        &rarr;
    </button>

    <div class="indicators">
        {#each Array(totalPages) as _, i}
            <button 
                class="dot" 
                class:active={i === currentPage}
                onclick={() => goToPage(i)}
                aria-label="Go to page {i + 1}"
            ></button>
        {/each}
    </div>
</div>

<style>
    .paginator-frame {
        position: relative;
        width: 100%;
        max-width: 1600px; /* Adjust as needed */
        margin: auto;
        display: flex;
        align-items: center;
    }

    .inner-content-viewport {
        width: 100%;
        overflow: hidden; /* This hides the other "pages" */
        border-radius: 20px;
    }

    .inner-content-track {
        display: flex;
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
    }

    /* THE MAGIC: Every child inside becomes exactly one page wide */
    .inner-content-track :global(> *) {
        flex: 0 0 100%;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        padding: 15px;
        cursor: pointer;
        border-radius: 50%;
        transition: opacity 0.3s;
    }

    .nav-btn:disabled {
        opacity: 0;
        cursor: default;
    }

    .left { left: -60px; }
    .right { right: -60px; }

    .indicators {
        position: absolute;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        border: none;
        cursor: pointer;
        padding: 0;
        transition: background 0.3s, transform 0.3s;
    }

    .dot.active {
        background: white;
        transform: scale(1.3);
    }
</style>