export const signUpValidation = (
  user,
  passwordConfirm,
  emailRef,
  passwordRef,
  passwordConfirmRef,
  nameRef,
  phoneRef
) => {
  if (!user.email) {
    alert("이메일을 입력하세요.");
    emailRef.current.focus();
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(user.email)) {
    alert("올바른 이메일 형식을 입력해 주세요.");
    emailRef.current.focus();
    return false;
  }

  if (!user.password) {
    alert("비밀번호를 입력하세요.");
    passwordRef.current.focus();
    return false;
  }

  if (user.password.length < 6) {
    alert("비밀번호는 6자리 이상으로 입력해 주세요.");
    passwordRef.current.focus();
    return false;
  }

  if (!user.name) {
    alert("이름을 입력하세요.");
    nameRef.current.focus();
    return false;
  }

  if (!user.phone) {
    alert("연락처를 입력하세요.");
    phoneRef.current.focus();
    return false;
  }

  if (user.password !== passwordConfirm || !passwordConfirm) {
    alert("비밀번호가 다릅니다.");
    passwordConfirmRef.current.focus();
    return false;
  }

  const phoneRegex = /^\d+$/;
  if (!phoneRegex.test(user.phone)) {
    alert("휴대폰 번호는 숫자만 입력해 주세요.");
    return false;
  }
  return true;
};

export const signInValidation = (email, password, emailRef, passwordRef) => {
  if (!email) {
    alert("이메일을 입력하세요.");
    emailRef.current.focus();
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("올바른 이메일 형식을 입력하세요.");
    emailRef.current.focus();
    return false;
  }

  if (!password) {
    alert("비밀번호를 입력하세요.");
    passwordRef.current.focus();
    return false;
  }
  return true;
};

export const postValidation = (title, category, titleRef, categoryRef) => {
  if (!title) {
    alert("제목을 입력하세요.");
    titleRef.current.focus();
    return false;
  }

  if (category === "") {
    alert("카테고리를 선택하세요.");
    categoryRef.current.focus();
    return false;
  }

  return true;
};

export const commentValidation = (content, contentRef) => {
  if (!content) {
    alert("댓글을 입력하세요.");
    contentRef.current.focus();
    return false;
  }
  return true;
};
