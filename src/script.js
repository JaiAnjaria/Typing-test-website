document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    });
  
    // Select the Developer text and LinkedIn text
    const devText = document.querySelector('.dev');
    const linkedInText = document.querySelector('.foot');
  
    // Observe the Developer text and LinkedIn text
    observer.observe(devText);
    observer.observe(linkedInText);
  });
  