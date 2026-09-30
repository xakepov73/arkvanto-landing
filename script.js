const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('is-open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const flowDetails = [
  'Система зафиксировала источник обращения и начала сценарий обработки.',
  'Типовые вопросы собрали контакт, услугу и сведения, необходимые для следующего шага.',
  'Сотрудник получил структурированную заявку, срок реакции и историю диалога.',
  'Система контролирует срок и напомнит, если расчёт или ответ не будет подготовлен.'
];
const flowDetail = document.querySelector('[data-flow-detail]');
document.querySelectorAll('[data-flow-step]').forEach((step) => {
  step.addEventListener('click', () => {
    document.querySelectorAll('[data-flow-step]').forEach((item) => item.classList.remove('is-active'));
    step.classList.add('is-active');
    if (flowDetail) flowDetail.textContent = flowDetails[Number(step.dataset.flowStep)];
  });
});

const routeCopy = {
  booking: {
    third: 'Выбор времени',
    thirdNote: 'по доступному расписанию',
    fourth: 'Подтверждение',
    fourthNote: 'и напоминание клиенту'
  },
  estimate: {
    third: 'Передача на расчёт',
    thirdNote: 'ответственному сотруднику',
    fourth: 'Контроль ответа',
    fourthNote: 'срок и возврат к клиенту'
  }
};

document.querySelectorAll('[data-route]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const route = routeCopy[tab.dataset.route];
    document.querySelectorAll('[data-route]').forEach((item) => {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
    });
    document.querySelector('[data-route-third]').textContent = route.third;
    document.querySelector('[data-route-third-note]').textContent = route.thirdNote;
    document.querySelector('[data-route-fourth]').textContent = route.fourth;
    document.querySelector('[data-route-fourth-note]').textContent = route.fourthNote;
  });
});

const observer = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll('.reveal').forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add('is-visible');
});

const form = document.querySelector('[data-contact-form]');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const errors = {
    name: data.get('name')?.toString().trim() ? '' : 'Укажи имя.',
    contact: data.get('contact')?.toString().trim() ? '' : 'Укажи телефон или Telegram.',
    consent: data.get('consent') ? '' : 'Нужно согласие на обработку данных.'
  };

  Object.entries(errors).forEach(([field, message]) => {
    const error = form.querySelector(`[data-error-for="${field}"]`);
    const input = form.elements[field];
    if (error) error.textContent = message;
    input?.classList.toggle('is-invalid', Boolean(message));
  });

  if (Object.values(errors).some(Boolean)) return;

  const status = form.querySelector('[data-form-status]');
  status.textContent = 'Форма заполнена. В демонстрационной версии данные не отправляются и не сохраняются.';
  status.classList.add('is-success');
  form.reset();
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
