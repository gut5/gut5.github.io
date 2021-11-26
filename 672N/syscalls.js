window.nameforsyscall = swapkeyval(window.syscallnames);
window.syscalls = {};

/* Get syscall name by index */
function swapkeyval(json) {
  var ret = {};
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      ret[json[key]] = key;
    }
  }
  return ret;
}

/* A short ass map of system call names -> number, you shouldn't need to touch this */
window.syscallnames = {
  "sys_aio_init": 670,
  "sys_fpathconf": 192,
  "sys_dmem_container": 586,
  "sys_evf_clear": 545,
  "sys_kqueue": 362,
  "sys_kevent": 363,
  "sys_futimes": 206,
  "sys_open": 5,
  "sys_thr_self": 432,
  "sys_mkdir": 136,
  "sys_pipe": 42,
  "sys_stat": 188,
  "sys_write": 4,
  "sys_evf_cancel": 546,
  "sys_ktimer_delete": 236,
  "sys_setregid": 127,
  "sys_jitshm_create": 533,
  "sys_sigwait": 429,
  "sys_fdatasync": 658,
  "sys_sigtimedwait": 345,
  "sys_get_gpo": 623,
  "sys_sched_setscheduler": 329,
  "sys_osem_open": 551,
  "sys_dynlib_get_info": 593,
  "sys_osem_post": 555,
  "sys_blockpool_move": 673,
  "sys_issetugid": 253,
  "sys_getdents": 272,
  "sys_rtprio_thread": 466,
  "sys_evf_delete": 539,
  "sys__umtx_op": 454,
  "sys_access": 33,
  "sys_reboot": 55,
  "sys_sigaltstack": 53,
  "sys_getcontext": 421,
  "sys_munmap": 73,
  "sys_setuid": 23,
  "sys_evf_trywait": 543,
  "sys_setcontext": 422,
  "sys_dynlib_get_list": 592,
  "sys_setsid": 147,
  "sys_fstatfs": 397,
  "sys_aio_multi_wait": 663,
  "sys_accept": 30,
  "sys_set_phys_fmem_limit": 637,
  "sys_thr_get_name": 616,
  "sys_get_page_table_stats": 671,
  "sys_sigsuspend": 341,
  "sys_truncate": 479,
  "sys_fsync": 95,
  "sys_execve": 59,
  "sys_evf_open": 540,
  "sys_netabort": 101,
  "sys_blockpool_unmap": 655,
  "sys_osem_create": 549,
  "sys_getlogin": 49,
  "sys_mincore": 78,
  "sys_shutdown": 134,
  "sys_profil": 44,
  "sys_preadv": 289,
  "sys_geteuid": 25,
  "sys_set_chicken_switches": 643,
  "sys_sigqueue": 456,
  "sys_aio_multi_poll": 664,
  "sys_get_self_auth_info": 607,
  "sys_opmc_enable": 563,
  "sys_aio_multi_delete": 662,
  "sys_rfork": 251,
  "sys_sys_exit": 1,
  "sys_blockpool_batch": 657,
  "sys_sigpending": 343,
  "sys_ktimer_gettime": 238,
  "sys_opmc_set_ctr": 566,
  "sys_ksem_wait": 402,
  "sys_sched_getparam": 328,
  "sys_swapcontext": 423,
  "sys_opmc_get_ctr": 567,
  "sys_budget_get_ptype": 610,
  "sys_msync": 65,
  "sys_sigwaitinfo": 346,
  "sys_lstat": 190,
  "sys_test_debug_rwmem": 619,
  "sys_evf_create": 538,
  "sys_madvise": 75,
  "sys_cpuset_getaffinity": 487,
  "sys_evf_set": 544,
  "sys_setlogin": 50,
  "sys_ksem_init": 404,
  "sys_opmc_disable": 564,
  "sys_namedobj_delete": 558,
  "sys_gettimeofday": 116,
  "sys_read": 3,
  "sys_thr_get_ucontext": 634,
  "sys_batch_map": 548,
  "sys_sysarch": 165,
  "sys_utc_to_localtime": 638,
  "sys_evf_close": 541,
  "sys_setrlimit": 195,
  "sys_getpeername": 31,
  "sys_aio_get_data": 665,
  "sys_lseek": 478,
  "sys_connect": 98,
  "sys_recvfrom": 29,
  "sys_getrlimit": 194,
  "sys_dynlib_get_info_for_libdbg": 656,
  "sys_thr_suspend_ucontext": 632,
  "sys__umtx_op": 454,
  "sys_kill": 37,
  "sys_dynlib_process_needed_and_relocate": 599,
  "sys_getsockname": 32,
  "sys_osem_trywait": 554,
  "sys_execve": 59,
  "sys_flock": 131,
  "sys_sigreturn": 417,
  "sys_query_memory_protection": 547,
  "sys_pwrite": 476,
  "sys_get_map_statistics": 642,
  "sys_ksem_getvalue": 407,
  "sys_sendfile": 393,
  "sys_socketex": 113,
  "sys_unlink": 10,
  "sys_thr_resume_ucontext": 633,
  "sys_dl_get_list": 535,
  "sys_cpuset_setaffinity": 488,
  "sys_clock_gettime": 232,
  "sys_thr_kill2": 481,
  "sys_set_timezone_info": 636,
  "sys_select": 93,
  "sys_pselect": 522,
  "sys_sync": 36,
  "sys_socketpair": 135,
  "sys_get_kernel_mem_statistics": 646,
  "sys_virtual_query_all": 674,
  "sys_physhm_open": 629,
  "sys_getuid": 24,
  "sys_revoke": 56,
  "sys_sigprocmask": 340,
  "sys_setegid": 182,
  "sys_cpuset_getid": 486,
  "sys_evf_wait": 542,
  "sys_sched_get_priority_max": 332,
  "sys_sigaction": 416,
  "sys_ipmimgr_call": 622,
  "sys_aio_submit_cmd": 669,
  "sys_free_stack": 620,
  "sys_settimeofday": 122,
  "sys_recvmsg": 27,
  "sys_aio_submit": 661,
  "sys_setgroups": 80,
  "sys_aio_multi_cancel": 666,
  "sys_nanosleep": 240,
  "sys_blockpool_map": 654,
  "sys_thr_create": 430,
  "sys_munlockall": 325,
  "sys_dynlib_get_info_ex": 608,
  "sys_pwritev": 290,
  "sys_mname": 588,
  "sys_regmgr_call": 532,
  "sys_getgroups": 79,
  "sys_osem_close": 552,
  "sys_osem_delete": 550,
  "sys_dynlib_get_obj_member": 649,
  "sys_debug_init": 560,
  "sys_mmap_dmem": 628,
  "sys_kldunloadf": 444,
  "sys_mprotect": 74,
  "sys_ksem_trywait": 403,
  "sys_ksem_close": 400,
  "sys_sched_rr_get_interval": 334,
  "sys_getitimer": 86,
  "sys_getpid": 20,
  "sys_netgetsockinfo": 102,
  "sys_get_cpu_usage_all": 627,
  "sys_eport_delete": 581,
  "sys_randomized_path": 602,
  "sys_jitshm_alias": 534,
  "sys_seteuid": 183,
  "sys_set_uevt": 640,
  "sys_clock_getres": 234,
  "sys_setitimer": 83,
  "sys_thr_exit": 431,
  "sys_sandbox_path": 600,
  "sys_thr_kill": 433,
  "sys_sys_exit": 1,
  "sys_dup2": 90,
  "sys_utimes": 138,
  "sys_pread": 475,
  "sys_dl_get_info": 536,
  "sys_ktimer_settime": 237,
  "sys_sched_setparam": 327,
  "sys_aio_create": 668,
  "sys_osem_wait": 553,
  "sys_dynlib_get_list_for_libdbg": 672,
  "sys_get_proc_type_info": 612,
  "sys_getgid": 47,
  "sys_fstat": 189,
  "sys_fork": 2,
  "sys_namedobj_create": 557,
  "sys_opmc_set_ctl": 565,
  "sys_get_resident_count": 613,
  "sys_getdirentries": 196,
  "sys_getrusage": 117,
  "sys_setreuid": 126,
  "sys_wait4": 7,
  "sys___sysctl": 202,
  "sys_bind": 104,
  "sys_sched_yield": 331,
  "sys_dl_get_metadata": 604,
  "sys_get_resident_fmem_count": 615,
  "sys_setsockopt": 105,
  "sys_dynlib_load_prx": 594,
  "sys_getpriority": 100,
  "sys_get_phys_page_size": 677,
  "sys_opmc_set_hw": 625,
  "sys_dynlib_do_copy_relocations": 596,
  "sys_netcontrol": 99,
  "sys_ksem_post": 401,
  "sys_netgetiflist": 125,
  "sys_chmod": 15,
  "sys_aio_suspend": 315,
  "sys_ksem_timedwait": 441,
  "sys_dynlib_dlsym": 591,
  "sys_get_paging_stats_of_all_objects": 618,
  "sys_osem_cancel": 556,
  "sys_writev": 121,
  "sys_ktimer_getoverrun": 239,
  "sys_rmdir": 137,
  "sys_sched_get_priority_min": 333,
  "sys_dynlib_unload_prx": 595,
  "sys_thr_set_name": 464,
  "sys_mlockall": 324,
  "sys_openat": 499,
  "sys_eport_open": 583,
  "sys_sigprocmask": 340,
  "sys_chdir": 12,
  "sys_physhm_unlink": 630,
  "sys_mtypeprotect": 379,
  "sys_thr_wake": 443,
  "sys_blockpool_open": 653,
  "sys_thr_new": 455,
  "sys_munlock": 204,
  "sys_fchflags": 35,
  "sys_ftruncate": 480,
  "sys_rename": 128,
  "sys_poll": 209,
  "sys_eport_trigger": 582,
  "sys_getsid": 310,
  "sys_virtual_query": 572,
  "sys_fchmod": 124,
  "sys__umtx_unlock": 435,
  "sys_mmap": 477,
  "sys_ktimer_create": 235,
  "sys_dup": 41,
  "sys_sendmsg": 28,
  "sys_close": 6,
  "sys_is_development_mode": 606,
  "sys_getegid": 43,
  "sys_get_vm_map_timestamp": 624,
  "sys_dynlib_get_proc_param": 598,
  "sys_fcntl": 92,
  "sys_getppid": 39,
  "sys_readv": 120,
  "sys_rdup": 603,
  "sys_listen": 106,
  "sys_app_state_change": 648,
  "sys_set_gpo": 617,
  "sys_ksem_unlink": 406,
  "sys_get_cpu_usage_proc": 641,
  "sys_shm_unlink": 483,
  "sys_reserve_2mb_page": 675,
  "sys_dynlib_get_info2": 660,
  "sys_mlock": 203,
  "sys_workaround8849": 605,
  "sys_get_sdk_compiled_version": 647,
  "sys_clock_settime": 233,
  "sys_ksem_destroy": 408,
  "sys_ksem_open": 405,
  "sys_thr_set_ucontext": 635,
  "sys_get_bio_usage_all": 667,
  "sys_getdtablesize": 89,
  "sys_chflags": 34,
  "sys_shm_open": 482,
  "sys_eport_close": 584,
  "sys_dynlib_get_list2": 659,
  "sys_socketclose": 114,
  "sys_sched_getscheduler": 330,
  "sys_pathconf": 191,
  "sys_localtime_to_utc": 639,
  "sys_setpriority": 96,
  "sys_cpumode_yield": 676,
  "sys_process_terminate": 652,
  "sys_ioctl": 54,
  "sys_opmc_get_hw": 626,
  "sys_eport_create": 580,
  "sys_socket": 97,
  "sys__umtx_lock": 434,
  "sys_thr_suspend": 442,
  "sys_is_in_sandbox": 585,
  "sys_get_authinfo": 587,
  "sys_mdbg_service": 601,
  "sys_getsockopt": 118,
  "sys_get_paging_stats_of_all_threads": 611,
  "sys_adjtime": 140,
  "sys_kqueueex": 141,
  "sys_uuidgen": 392,
  "sys_set_vm_container": 559,
  "sys_sendto": 133,
}