<template>
  <div clss="footer-wrapper">
    <div class="light-green">1</div>
    <div class="green">2</div>
    <div class="light-green">3</div>
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  padding: 2em 96px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 768px) {
    padding-top: 0;
    flex-direction: column;
    align-items: center;
  }
  .light-green {
    justify-content: center;
  }
  .green {
    justify-content: center;
  }
}
</style>
