/* =====================================================
   네이버 플레이스 클론 - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // =====================================================
  // 탭 네비게이션
  // =====================================================
  
  const tabItems = document.querySelectorAll('.tab-item');
  const tabNavigation = document.querySelector('.tab-navigation');
  
  tabItems.forEach(tab => {
    tab.addEventListener('click', function() {
      // 활성 탭 변경
      tabItems.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // 해당 섹션으로 스크롤
      const targetId = this.dataset.tab;
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = tabNavigation.offsetHeight + 60;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 스크롤 시 탭 활성화
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        tabItems.forEach(tab => {
          tab.classList.remove('active');
          if (tab.dataset.tab === sectionId) {
            tab.classList.add('active');
          }
        });
      }
    });
  });
  
  // =====================================================
  // 사진 필터 클릭
  // =====================================================
  
  const filterItems = document.querySelectorAll('.filter-item');
  
  filterItems.forEach(item => {
    item.addEventListener('click', function() {
      filterItems.forEach(f => f.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // =====================================================
  // 메뉴 탭 클릭
  // =====================================================
  
  const menuTabs = document.querySelectorAll('.menu-tab');
  
  menuTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      menuTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // =====================================================
  // 복사 버튼
  // =====================================================
  
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const infoRow = this.closest('.info-row');
      const mainText = infoRow.querySelector('.main');
      
      if (mainText) {
        navigator.clipboard.writeText(mainText.textContent).then(() => {
          const originalText = this.textContent;
          this.textContent = '복사됨';
          this.style.background = 'var(--color-accent-light)';
          
          setTimeout(() => {
            this.textContent = originalText;
            this.style.background = '';
          }, 2000);
        });
      }
    });
  });
  
  // =====================================================
  // 저장 버튼 토글
  // =====================================================
  
  const saveBtn = document.querySelector('.utility-btn');
  
  if (saveBtn) {
    saveBtn.addEventListener('click', function() {
      const icon = this.querySelector('.icon');
      if (icon.textContent === '☆') {
        icon.textContent = '★';
        icon.style.color = '#FFD700';
      } else {
        icon.textContent = '☆';
        icon.style.color = '';
      }
    });
  }
  
  // =====================================================
  // 뒤로가기 / 닫기 버튼
  // =====================================================
  
  const backBtn = document.querySelector('.back-btn');
  const closeBtn = document.querySelector('.close-btn');
  
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      // 페이지 닫기 또는 특정 동작
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // =====================================================
  // 사진 갤러리 클릭 (라이트박스)
  // =====================================================
  
  const photoItems = document.querySelectorAll('.photo-item, .hero-gallery .main-image, .hero-gallery .side-image');
  
  photoItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        // 간단한 알림 (실제로는 라이트박스 모달 구현 가능)
        console.log('Photo clicked:', img.src);
      }
    });
    
    // 마우스 커서 변경
    item.style.cursor = 'pointer';
  });
  
  // =====================================================
  // 가로 스크롤 드래그
  // =====================================================
  
  const scrollContainers = document.querySelectorAll('.menu-scroll, .photo-filter');
  
  scrollContainers.forEach(container => {
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
      isDown = false;
      container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });
    
    // 기본 커서 설정
    container.style.cursor = 'grab';
  });
  
  // =====================================================
  // 알림/공유 버튼
  // =====================================================
  
  const notificationBtn = document.querySelector('.notification-btn');
  
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
      const icon = this.querySelector('span:first-child');
      if (icon.textContent === '🔔') {
        icon.textContent = '🔕';
        this.style.background = 'var(--color-divider)';
      } else {
        icon.textContent = '🔔';
        this.style.background = '';
      }
    });
  }
  
  // 공유 버튼
  const shareBtn = document.querySelector('.utility-btn:last-child');
  
  if (shareBtn && navigator.share) {
    shareBtn.addEventListener('click', async function() {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled or not supported');
      }
    });
  }
  
});
